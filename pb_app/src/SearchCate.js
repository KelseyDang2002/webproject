import pb from "lib/pocketbase.js";
import {useForm} from "react-hook-form";
import HomeNavBar from "HomeNavBar";
import "stylesheets/searchcate.css";

export default function SearchCate() {
    const {register, handleSubmit, reset} = useForm();

    async function search_button(data) {
        const title = data.title;

        const search_filter = `title = "${title.toLowerCase()}"`;

        try {
            const search = await pb.collection("categories").getFullList({
                filter: search_filter,
            });

            if (search.length !== 0) {
                console.log("Category found.");
                const category_key = search[0].id;
                localStorage.setItem("category_key", category_key);
                localStorage.setItem("currentPage", "ViewCate");
                window.location.reload();
            } else {
                console.log("Category not found.");
                reset();
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    async function createcate_button() {
        localStorage.setItem("currentPage", "CreateCate");
        window.location.reload();
    }

    return (
        <>
            <html lang="en">
                <head>
                </head>
                <body>
                    <div className="searchcate-container">
                        {/* <HomeNavBar/> */}
                        <div className="searchcate-form-box">
                            <h1>Category Search</h1>
                            <form onSubmit={handleSubmit(search_button)}>
                                <div className="searchcate-input-group">
                                    <div className="searchcate-input-field">
                                        <input type="text" id="title" placeholder="Category Name" {...register("title")}></input>
                                    </div>

                                    <div className="searchcate-button">
                                        <button type="submit" id="search_button">Search</button>
                                        <button id="createcate_button" onClick={createcate_button.bind(this)}>Create Category</button>
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