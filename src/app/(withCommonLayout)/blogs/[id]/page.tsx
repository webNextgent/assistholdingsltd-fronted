'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetAllBlogsQuery } from '@/redux/features/blogs/blogsApi';
import LandownerBanner from '@/components/shared/Landowner/LandownerBanner';

const BlogSingle: React.FC = () => {
  const params = useParams();
  const blogId = params.id;

  const { data: blogsData, isLoading, isError } = useGetAllBlogsQuery(null);

  if (isLoading) return <p className="text-center py-20 text-gray-600">Loading blog...</p>;
  if (isError) return <p className="text-center py-20 text-red-500">Failed to load blog.</p>;

  const blog = blogsData?.find((b: any) => b.id === blogId);

  if (!blog) return <p className="text-center py-20 text-gray-700">Blog not found.</p>;

  return (
    <div className="bg-gray-50">
      {/* Keep the existing LandownerBanner unchanged */}
      <LandownerBanner
        img={
          "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/06/How_To_Start_A_Blog_-_article_image.jpg"
        }
        title="blogs"
      />

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Date */}
        <p className="text-gray-500 text-sm mb-4">
          {new Date(blog.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{blog.title}</h1>

        {/* Blog Image */}
        {blog.Image && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img
              src={blog.Image}
              alt={blog.title}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg text-gray-800 leading-relaxed">
          <p>{blog.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogSingle;
