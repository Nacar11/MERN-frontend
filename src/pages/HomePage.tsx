import { useGetAllPostsInfinite } from "../react-query/QueriesAndMutations";
import PostDetails from "../components/specific/PostDetails";
import { Post } from "../api/types";
import Loader from "../components/shared/Loader";
import { useEffect, useRef } from "react";

const HomePage = () => {
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useGetAllPostsInfinite(10);

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.data?.posts || []) || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Social</h1>
        <p className="text-gray-600">Share your thoughts with the community</p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-60">
          <Loader />
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center w-full">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <code className="text-red-600">
              {error instanceof Error ? error.message : 'Something went wrong fetching posts.'}
            </code>
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="space-y-4">
          {allPosts.length > 0 ? (
            <>
              {allPosts.map((post: Post) => (
                <PostDetails post={post} key={post._id} />
              ))}
              
              {/* Intersection observer target */}
              <div ref={observerTarget} className="h-10 flex justify-center items-center">
                {isFetchingNextPage && <Loader />}
              </div>

              {!hasNextPage && allPosts.length > 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>You've reached the end! 🎉</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">No posts yet. Be the first to create one!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
