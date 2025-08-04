// src/components/Semester.jsx
import React, { useState } from "react";

function Semester({ id }) {
    const [title, setTitle] = useState("");

    return (
        <div className="bg-white rounded-xl p-4 my-4 shadow-md text-black">
            <input
                type="text"
                placeholder="Semester Name (e.g. Fall 2024)"
                className="border px-2 py-1 w-full rounded mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-sm text-gray-500">Semester ID: {id}</p>
        </div>
    );
}

export default Semester;
