import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";
import HomeNavBar from "HomeNavBar";

var category_key = localStorage.getItem("category_key");

export default function CreatePost() {
    const {register, handleSubmit, reset} = useForm();

    async function create_button(data) {
         const post_text = data.post_text;
         const comment_text_q = data.comment_text_q;

         try {
            const data = {
                "category_key": category_key,
                "post_text": post_text,
            };
            await pb.collection("posts").create(data);
         } catch (error) {
            console.log("Failed to create post", error);
         }

         try {
            const post_record = await pb.collection("posts").getFullList({
                filter: `post_text = "${post_text}"`,
            });

            const post_key = post_record[0].id;

            const comment_text_data = {
                "post_key": post_key,
                "comment_text": comment_text_q,
                "username": pb.authStore.model.username,
            };
            await pb.collection("comments").create(comment_text_data);

            localStorage.setItem("post_key", post_key);
            localStorage.setItem("currentPage", "CreateComment");
            window.location.reload();
         } catch (error) {
            console.log("Failed to create comment: ", error);
         }
         reset();
    }

    return (
        <>
            <html>
                <head>
                    <link link="stylesheet" href="createpost.css"></link>
                </head>
                <body>
                    <div className="createpost-container">
                        <HomeNavBar/>
                        <div className="createpost-form-box">
                            <h1>Create Post</h1>
                            <form onSubmit={handleSubmit(create_button)}>
                                <div className="createpost-input-group">
                                    <div className="createpost-input-field">
                                        <input type="text" id="post_text" 
                                            placeholder="Post Text"
                                            {...register("post_text")}>
                                        </input>
                                    </div>

                                    <div className="createpost-input-field">
                                        <input type="text" id="comment_text_q" 
                                            placeholder="Post Contents"
                                            {...register("comment_text_q")}>
                                        </input>
                                    </div>

                                    <div className="createpost-button">
                                        <button type="submit" id="create_button">Post</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        </>
    );
}