import React, {useState} from "react";
import {WithContext as ReactTags} from 'react-tag-input';
import "./Tags.css";

const Tags = () => {
    const [tags, setTags] = useState([
        {"id": "Thailand", "text": "Thailand"},
        {"id": "India", "text": "India"},
        {"id": "Vietnam", "text": "Vietnam"},
        {"id": "Turkey", "text": "Turkey"}
    ]);

    const KeyCodes = {
        comma: 188,
        enter: 13,
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = [...tags].slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setTags(newTags);
    };

    return (
        <div className="d-flex justify-content-center my-4 align-self-center">
            <ReactTags
                tags={tags}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                suggestions={[{"id": "1", "text": "Albania"}, {"id": "2", "text": "Australia"}, {
                    "id": "3",
                    "text": "France"
                }, {"id": "4", "text": "India"}, {"id": "5", "text": "Oman"}, {"id": "6", "text": "Russia"}, {
                    "id": "7",
                    "text": "Serbia"
                }, {"id": "8", "text": "Swaziland"}, {"id": "9", "text": "United States of America"}, {
                    "id": "10",
                    "text": "Vietnam"
                }]}
                delimiters={delimiters}/>
        </div>
    )
}

export default Tags;