import pb from "lib/pocketbase";
import { useMutation } from "react-query";

export default function useCreatePost() {
    async function createPost({post_title, post_text}) {
        const record = {
            post_title: post_title,
            post_text: post_text,
        };
        await pb.collection("posts").create(record);
        alert("Post created.");
    }
    return useMutation(createPost);
}