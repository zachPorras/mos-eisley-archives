import { useState, useEffect } from 'react';
import { server_calls } from '../api';
import { useAppSelector } from '../redux/hooks';

export const useFetchBlogs = () => {
    let token = useAppSelector((state) => state.root.user_token)
    // introduce State that we will manipulate
    const [blogData, setData] = useState<any>([]);

    // interior function to get data that we will later insert into State
    const handleBlogFetch = async () => {
        console.log('data was fetched')
        const result = await server_calls.getAll(token,'blog');
        
        setData(result)
    };

    // executes interior function, then adds received data to State
    useEffect( () => {
        handleBlogFetch();
    }, [])

    // return new State, getData functionality : what functionality it gives us
    return {blogData, getData:handleBlogFetch}
}