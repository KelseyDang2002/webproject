import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";
import HomeNavBar from "HomeNavBar";
import "stylesheets/createcate.css";

export default function CreateCate() {
    const {register, handleSubmit, reset} = useForm();

    async function create_button(data) {
        const title = data.title;

        const search_filter = `title = "${title.toLowerCase()}"`;

        try {
            const search = await pb.collection("categories").getFullList({
                filter: search_filter,
            });

            if (search.length === 0) {
                const data = {
                    "title": title.toLowerCase(),
                    "username": pb.authStore.model.username,
                };
                await pb.collection("categories").create(data);

                const category = await pb.collection("categories").getFullList({
                    filter: `title = "${title.toLowerCase()}"`
                });

                localStorage.setItem("category_key", category[0].id);
                localStorage.setItem("currentPage", "ViewCate");
                window.location.reload();
            } else {
                console.log("This category already exists.");
                reset();
            }
        } catch (error) {
            console.log("Error: ", error);
        }
        reset();
    }

    return (
        <>
            <html lang="en">
                <head>
                </head>
                <body>
                    <div className="createcate-container">
                        <HomeNavBar/>
                        <div className="createcate-form-box">
                            <h1>Create Category</h1>
                            <form onSubmit={handleSubmit(create_button)}>
                                <div className="createcate-input-group">
                                    <div className="createcate-input-field">
                                        <input type="text" id="title" placeholder="Category Name" {...register("title")}></input>
                                    </div>

                                    <div className="createcate-button">
                                        <button type="submit" id="create_button">Create</button>
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