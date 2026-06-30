const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("modal");
const addBlog = document.getElementById("addBlog");
const title = document.getElementById("title");
const image = document.getElementById("image");
const description = document.getElementById("description");
const blogContainer = document.getElementById("blogContainer");

let blogs = [
    {
        id:1,
        title:"Learn JavaScript",
        image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
        description:"JavaScript is one of the most popular programming languages used to build interactive websites.",
        
    },

    {
        id:2,
        title:"Introduction to CSS",
        image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
        description:"CSS helps make your website beautiful by adding colors, layouts, spacing and animations.",
        
    },

    {
        id:3,
        title:"Learn HTML..",
        image:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
        description:"HTML is the backbone of every website. Every web developer starts with HTML.",
        
    }

];
showBlogs();
openModal.addEventListener("click",function(){
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

addBlog.addEventListener("click",function(){
    let blogTitle=title.value.trim();
    let blogImage=image.value.trim();
    let blogDescription=description.value.trim();
    if(blogTitle=="" || blogDescription==""){
        alert("Please fill all required fields.");
        return;
    }

    if(blogImage==""){
        blogImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800";
    }

    let newBlog={
        title:blogTitle,
        image:blogImage,
        description:blogDescription,
        
    };
    blogs.unshift(newBlog);
    showBlogs();
    title.value="";
    image.value="";
    description.value="";
    modal.style.display="none";
});

function showBlogs(){
    blogContainer.innerHTML="";
    if(blogs.length==0){
        blogContainer.innerHTML="<h2 class='empty'>No Blogs Available</h2>";
        return;
    }

    blogs.forEach(function(blog){
        let card=document.createElement("div");
        card.className="card";
        card.innerHTML=`
        <img src="${blog.image}">
        <div class="card-content">
            <h2>${blog.title}</h2>
            <p>${blog.description}</p>
            <div class="card-footer">
                <div>
                    </button>
                    <button class="delete" onclick="deleteBlog(${blog.id})">
                    Delete
                    </button>
                </div>
            </div>
        </div>
        `;

        blogContainer.appendChild(card);

    });

}

function deleteBlog(id){
    let answer=confirm("Do you want to delete this blog?");
    if(answer){
        blogs=blogs.filter(function(blog){
            return blog.id!=id;
        });
        showBlogs();
    }
}
const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});
const cards = document.querySelectorAll(".card");

cards.forEach(card => {

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

});



