import React from "react";
import {WithContext as ReactTags} from 'react-tag-input';
import "./AddTags.css";
import Form from "react-bootstrap/Form";
import {Button, InputGroup} from "react-bootstrap";

const AddTags = ({tags, handleAddTag, handleDeleteTag, handleAddTags, handleChange, values, errors}) => {

    const KeyCodes = {
        comma: 188,
        enter: 13,
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = (i) => {
        handleDeleteTag(i);
    };

    const handleAddition = () => {
        let value = values.tag.trim();
        if (value === '' || value.length < 3 || value.length > 15) {
            return;
        }
        handleAddTag({id: values.tag, text: values.tag});
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = [...tags].slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        handleAddTags(newTags)
    };

    return (
        <>
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="AddTags"
                    name="tag"
                    value={values.tag}
                    onChange={handleChange}
                    isInvalid={!!errors.tag}
                />
                <Button variant="primary" onClick={handleAddition}>Add</Button>
                <Form.Control.Feedback type="invalid">
                    {errors.tag}
                </Form.Control.Feedback>
            </InputGroup>

            <div className="d-flex justify-content-center my-4 align-self-center">
                <ReactTags
                    tags={tags}
                    handleDelete={handleDelete}
                    // handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    delimiters={delimiters}/>
            </div>
        </>
    )
}

export default AddTags;