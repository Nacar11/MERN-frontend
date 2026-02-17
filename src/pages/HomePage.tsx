import { useGetAllPostsInfinite } from "../react-query/QueriesAndMutations";
import PostDetails from "../components/specific/PostDetails";
import { Post } from "../api/types";
import Loader from "../components/shared/Loader";
import PeopleYouMayKnow from "../components/specific/PeopleYouMayKnow";
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Left Sidebar — People You May Know */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24">
            <PeopleYouMayKnow />
          </div>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 max-w-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome to <span className="text-green-500 font-black">Social</span>
            </h1>
            <p className="text-gray-400">Share your thoughts with the community</p>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center h-60">
              <Loader />
            </div>
          )}

          {isError && (
            <div className="flex justify-center items-center w-full">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <code className="text-red-400 text-sm">
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
                    <div className="text-center py-8 text-gray-600">
                      <p>You've reached the end! 🎉</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
                  <p className="text-gray-500 text-lg">No posts yet. Be the first to create one!</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile: People You May Know (below feed on small screens) */}
      <div className="lg:hidden mt-8">
        <PeopleYouMayKnow />
      </div>
    </div>
  );
};

export default HomePage;
