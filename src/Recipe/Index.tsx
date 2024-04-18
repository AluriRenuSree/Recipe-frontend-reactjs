import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const RenderIndex = () => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState<any>();
    const navigate = useNavigate()
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (url === '') {
            alert("please provide url")
        }

        const response = await axios.post('http://localhost:8080/parse-url', { url }).then((response: any) => {
            console.log("res", response)
            navigate('/receipe-list')
        }).catch((error: any) => {
            console.log("error submit", error)
            setError(error)
        });
    };

    return (
        <div className="form-container">
            <h2>Share Recipe Link</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL"
                />
                <button type="submit">Submit</button>
                {loading && <CircularProgress style={{ marginTop: '10px' }} />}
                {error && <p>{error.message}</p>}
            </form>
        </div>
    );

}

export default RenderIndex;
