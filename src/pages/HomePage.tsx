import { useGetAllPosts } from "../react-query/QueriesAndMutations";
import PostDetails from "../components/specific/PostDetails";
import { Post } from "../api/types";
import Loader from "../components/shared/Loader";

const HomePage = () => {
  const { data, isLoading, isError, error } = useGetAllPosts(1, 20);

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

      {data && (
        <div className="space-y-4">
          {data.data?.posts?.length > 0 ? (
            data.data.posts.map((post: Post) => (
              <PostDetails post={post} key={post._id} />
            ))
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
