import useLogout from "hooks/useLogout";
import pb from "lib/pocketbase";
import HomeNavBar from "HomeNavBar";
import SearchCate from "SearchCate";
import "stylesheets/home.css";

export default function Home() {
    const logout = useLogout();

    const isLoggedIn = pb.authStore.isValid;

    if (isLoggedIn)
        return (
            <>
                <html>
                    <head>
                        <link rel="stylesheet" href="home.css"></link>
                    </head>
                    <body>
                        <div className="home-container">
                            <HomeNavBar/>
                            <div className="home-form-box">
                                <h1>Welcome to ReCourse, {pb.authStore.model.username}.</h1>
                                <h2>A lightweight forum with React.</h2>
                                <div class="home-button">
                                    <a href="Login.js" onClick={logout}>Logout</a>
                                </div>
                            </div>
                        </div>
                        <SearchCate/>
                    </body>
                </html>
            </>
        );
}