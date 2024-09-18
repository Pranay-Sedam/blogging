import React from 'react'

const Post = () => {
  return (
    <div>
         <div className="post">
          <div className="image">
          <img src="https://www.tesmanian.com/cdn/shop/articles/Model3_77_RHD_04d1427f-e398-4129-aea6-8af8eb9d485c.jpg?v=1698864089&width=1000" alt="" />
          </div>
          
          <div className="text">
          <h2>Tesla is set to be part of the Treasury and IRS Clean Vehicle Tax Credit Portal for Car Dealers.</h2>
            <p className="info">
              <a href="" className="author">Prince Leo</a>
              <time>2024-1-1 10:10</time>
            </p>
            <p className='summary'>
            The U.S. Department of the Treasury and the IRS have initiated the registration process for car dealers, 
            including Tesla, to access the IRS Energy Credits 
            </p>
          </div>   
        </div>
    </div>
  )
}

export default Post
