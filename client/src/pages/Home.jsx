/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {Card,FormField,Loader } from '../components/index.js';

const RenderCards=({data,title})=>{
  if(data?.length>0){
    return (
    data.map(post => <Card key={post._id} {...post}/>)
    );
  }
  return(
  <h2 className='mt-5 font-bold text-[#6449ff] text-xl
  uppercase'>{title}</h2>
  )
} 

const Home =() => {
  const [loading,setLoading]=useState(false);
  const [searchText,setSearchText]=useState('');
  const [allPosts,setAllPosts]=useState(null);
  const [searchedPosts,setSearchedPosts]=useState(null);
  const [TimeoutId,setTimeoutId]=useState(null);

  const handleSearchChange=(e)=>{
    clearTimeout(TimeoutId);
    setSearchText(e.target.value);
    
    const id=setTimeout(()=>{
      const posts=allPosts.filter(post=> post.name.toLowerCase().includes(searchText.toLowerCase())
                || post.prompt.toLowerCase().includes(searchText.toLowerCase()) );
      setSearchedPosts(posts);
      
    },500);

    setTimeoutId(id);
  }

  const getAllPosts=async()=>{
    setLoading(true);
    try{
    const response=await fetch('https://image-generator-api-wcqw.onrender.com/api/v1/post',{
      method:'GET',
      headers:{
        'Content-type':'application/json'
      }
    });
    
    if(response.ok) {
    const data=await response.json();
    setAllPosts(data.posts.reverse());
      }
    }
    catch(error){
      alert(error);
    }
    finally{
      setLoading(false);
    }
    
    };

  useEffect(()=>{
   getAllPosts();
  },[])

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#2222328] text-[32px]'>
        The Community Showcase
      </h1>
      <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
      Browse thorugh a collection of imaginative
      and visually stunning images generated by
      DALL-E Ai
      </p>
      </div>

      <div className='mt-16'>
      <FormField
    name="text"
    type="text"
    placeholder="search your post"
    handleChange={handleSearchChange}
    value={searchText}
    labelName="search post"
  />
      </div>
    {/* if is loading then only the posts which are already loaded will be shown below the loader(either all posts or searchedPosts) 
    if is not loading then will check whether there is a search text(then render showing results for that text) and below posts 
    will be rendered according to search text*/}

      <div className='mt-10'>
        {loading ? 
        <div className='flex justify-center items-center'>
        <Loader/>
        </div>
        :<>
        { searchText && (
         <h2 className='font-medium text--[#666e75] 
         text-xl mb-3'>
          Showing results for  
          <span className='text-[#2222328]'>{searchText}</span>
          </h2>)
        }
        

      <div className='grid lg:f=grid-cols-4 sm:grid-cols-3 
      xs:grid-cols-2 grid-cols-1 gap-3'>
        {searchText 
        ? <RenderCards data={searchedPosts} 
        title={'No Search results Found '} /> 
        : <RenderCards data={allPosts} 
        title={'No Posts to show'}/>
        }
      </div>
      </>
      }
      </div>

    </section>
    
  )
}

export default Home