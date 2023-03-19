import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
    const [title, setTitle] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:4000/posts", {
            title,
        });

        setTitle("");
    };
    return (
        <div>
            <h1>Create a new post</h1>
            <form onSubmit={onSubmitHandler}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        name="title"
                        id="floatingInput"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Title</label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PostCreate;
