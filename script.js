const API_URL = "/api/blogs";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800";

const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const saveBlog = document.getElementById("saveBlog");
const title = document.getElementById("title");
const image = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");
const description = document.getElementById("description");
const blogContainer = document.getElementById("blogContainer");

let blogs = [];
let editingId = null;

openModal.addEventListener("click",function(){
    resetForm();
    modal.style.display="flex";
});
closeModal.addEventListener("click",function(){
    modal.style.display="none";
});

window.addEventListener("click",function(e){
    if(e.target==modal){
        modal.style.display="none";
    }
});

image.addEventListener("input",function(){
    showImagePreview(image.value.trim());
});

saveBlog.addEventListener("click", async function(){
    let blogTitle=title.value.trim();
    let blogImage=image.value.trim();
    let blogDescription=description.value.trim();
    if(blogTitle=="" || blogDescription==""){
        alert("Please fill all required fields.");
        return;
    }

    if(blogImage==""){
        blogImage=DEFAULT_IMAGE;
    }

    const blogData={
        title:blogTitle,
        image:blogImage,
        description:blogDescription
    };

    const isEditing = editingId !== null;
    const url = isEditing ? `${API_URL}/${editingId}` : API_URL;

    try{
        const response = await fetch(url, {
            method: isEditing ? "PATCH" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogData)
        });

        if(!response.ok){
            const err = await response.json();
            throw new Error(err.message || "Failed to save blog");
        }

        title.value="";
        image.value="";
        description.value="";
        editingId=null;
        modal.style.display="none";
        await fetchBlogs();
    } catch(error){
        alert(error.message);
    }
});

function resetForm(){
    editingId=null;
    modalTitle.textContent="Create New Blog";
    saveBlog.textContent="Publish Blog";
    title.value="";
    image.value="";
    description.value="";
    imagePreview.src="";
    imagePreview.classList.remove("show");
}

function showImagePreview(url){
    if(url){
        imagePreview.src=url;
        imagePreview.onerror=function(){
            this.src=DEFAULT_IMAGE;
        };
        imagePreview.classList.add("show");
    } else {
        imagePreview.src="";
        imagePreview.classList.remove("show");
    }
}

async function fetchBlogs(){
    try{
        const response = await fetch(API_URL);
        if(!response.ok){
            throw new Error("Failed to load blogs");
        }

        blogs = await response.json();
        showBlogs();
    } catch(error){
        blogContainer.innerHTML="<h2 class='empty'>Could not load blogs</h2>";
    }
}

async function deleteBlog(id){
    let answer=confirm("Do you want to delete this blog?");
    if(!answer) return;

    try{
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if(!response.ok){
            const err = await response.json();
            throw new Error(err.message || "Failed to delete blog");
        }

        await fetchBlogs();
    } catch(error){
        alert(error.message);
    }
}

function showBlogs(){
    blogContainer.innerHTML="";
    if(blogs.length==0){
        blogContainer.innerHTML="<h2 class='empty'>No Blogs Available</h2>";
        return;
    }

    blogs.forEach(function(blog){
        const date = new Date(blog.createdAt).toLocaleDateString();
        let card=document.createElement("div");
        card.className="card";
        card.innerHTML=`
        <img src="${blog.image}" onerror="this.onerror=null;this.src='${DEFAULT_IMAGE}'">
        <div class="card-content">
            <span class="blog-id">ID: ${blog._id}</span>
            <h2>${blog.title}</h2>
            <p>${blog.description}</p>
            <div class="card-footer">
                <span class="date">${date}</span>
                <div class="actions">
                    <button class="edit" onclick="editBlog('${blog._id}')">
                    Edit
                    </button>
                    <button class="delete" onclick="deleteBlog('${blog._id}')">
                    Delete
                    </button>
                </div>
            </div>
        </div>
        `;

        addCardTilt(card);
        blogContainer.appendChild(card);
    });
}

async function editBlog(id){
    const blog = blogs.find(function(b){ return b._id === id; });
    if(!blog) return;

    editingId = id;
    modalTitle.textContent = "Edit Blog";
    saveBlog.textContent = "Update Blog";
    title.value = blog.title || "";
    image.value = blog.image || "";
    description.value = blog.description || "";
    showImagePreview(blog.image);
    modal.style.display = "flex";
}

function addCardTilt(card){
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 20;
        const rotateX = ((y / rect.height) - 0.5) * -20;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
}

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

window.deleteBlog = deleteBlog;
window.editBlog = editBlog;

fetchBlogs();