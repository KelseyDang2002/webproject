import pb from "lib/pocketbase.js";
import HomeNavBar from "HomeNavBar";

var category_key = localStorage.getItem("category_key");

export default function ViewCate() {
    async function view_post(comment_key) {
        localStorage.setItem("comment_key", comment_key);
        localStorage.setItem("currentPage", "CreateComment");
        window.location.reload();
    }

    async function create_post_button() {
        localStorage.setItem("currentPage", "CreatePost");
        window.location.reload();
    }

    async function generate_containers() {
        try {
            const category = await pb.collection("categories").getFullList({
                filter: `id = "${category_key}"`
            });

            const post = await pb.collection("posts").getFullList({
                filter: `category_key = "${category_key}"`,
            });

            const category_header = category[0].title.toUpperCase();

            var parent_container = document.getElementById("parent_container");
            var category_title = document.createElement("h1");
            category_title.setAttribute("className", "category_title");
            category_title.innerText = category_header;
            parent_container.appendChild(category_title);

            for (var i = 0; i < post.length; i++) {
                var post_i = document.createElement("div");
                post_i.setAttribute("className", "post_container");

                var post_title = document.createElement("h3");
                post_title.setAttribute("className", "post_title");
                post_title.innerText = post[i].post_text;

                post_title.addEventListener('click', view_post.bind(this, post[i].id));

                post_i.appendChild(post_title);
                parent_container.appendChild(post_i);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        <>
            <html lang="en">
                <head>
                </head>
                <body onLoad={() => generate_containers()}>
                    <div className="viewcate-container">
                        <HomeNavBar/>
                        <div className="viewcate-form-box">
                            <h1>View Categories</h1>
                            <div className="parent_container" id="parent_container"></div>
                            <div className="viewcate-button">
                                <button id="create_post_button" onClick={create_post_button.bind(this)}>Create Post</button>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        </>
    );
}