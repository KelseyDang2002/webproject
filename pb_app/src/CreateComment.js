import pb from "lib/pocketbase.js";
import {useForm} from 'react-hook-form';
import HomeNavBar from "HomeNavBar";

var post_key = localStorage.getItem('post_key');

export default function CreateComment() {
    const {register, handleSubmit, reset} = useForm();

    async function create_comment_button(data) {
        const comment_text_a = data.comment_text_a;

        try {
            const data = {
                "post_key": post_key,
                "comment_text": comment_text_a,
                "username": pb.authStore.model.username,
            };
            await pb.collection("comments").create(data);
            console.log("New comment created.");
        } catch (error) {
            console.log("Error creating comment: ", error);
        }
        reset();
        window.location.reload();
    }

    async function generate_containers() {
        try {
            const post = await pb.collection('posts').getFullList({
                filter: `id = "${post_key}"`,
            });

            const comment = await pb.collection('comments').getFullList({
                filter: `post_key = "${post_key}"`,
            });

            const post_title = post[0].title;

            var parent_container = document.getElementById("parent_container");

            var parent_container_title = document.createElement("h2");
            parent_container_title.setAttribute("className", "post_title");
            parent_container_title.innerText = post_title;
            parent_container.appendChild(parent_container_title);

            var question_div = document.createElement("div");
            question_div.setAttribute("className", "question_container");

            var asker_username = document.createElement("p");
            asker_username.setAttribute("className", "username_text");
            asker_username.innerHTML = "Asked by: " + comment[0].username;

            var question = document.createElement("p");
            question.innerText = comment[0].comment_text;
            question_div.appendChild(asker_username);
            question_div.appendChild(question);
            parent_container.appendChild(question_div);

            for (var i = 1; i < comment.length; i++) {
                var answer_i = document.createElement("div");
                answer_i.setAttribute("className", "answer_container");

                var username = document.createElement("p");
                username.innerText = "Reply by: " + comment[i].username;
                answer_i.appendChild(username);

                var desc = document.createElement("p");
                desc.innerText = comment[i].comment_text;
                answer_i.appendChild(desc);

                parent_container.appendChild(answer_i);
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
                <body>
                    <div className="createcom-container">
                        <HomeNavBar/>
                        <div className="createcom-form-box">
                            <h1>View Comments</h1>
                            <div className="parent_container" id="parent_container" onLoad={generate_containers()}></div>

                            <form onSubmit={handleSubmit(create_comment_button)}>
                                <div className="createcom-input-group">
                                    <div className="createcom-input-field">
                                        <textarea 
                                        type="text" 
                                        id="comment_text_a" 
                                        placeholder="Type comment here..." 
                                        {...register("comment_text_a")}>
                                        </textarea>
                                    </div>
                                </div>

                                <div className="createcom-button">
                                    <button type="submit" id="create_button">Comment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        </>
    );
}