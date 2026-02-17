export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = "createUserAccount",

  // USER KEYS
  GET_CURRENT_USER = "getCurrentUser",
  GET_USERS = "getUsers",
  GET_USER_BY_USERNAME = "getUserByUsername",
  GET_USER_PROFILE = "getUserProfile",
  UPDATE_USER_BIO = "updateUserBio",
  SEARCH_USERS = "searchUsers",

  // POST KEYS
  GET_ALL_POSTS = "getAllPosts",
  GET_ALL_POSTS_INFINITE = "getAllPostsInfinite",
  GET_USER_POSTS = "getUserPosts",
  CREATE_POST = "createPost",
  GET_FEED = "getFeed",
  GET_FEED_INFINITE = "getFeedInfinite",
  SEARCH_POSTS = "searchPosts",

  // ENGAGEMENT KEYS
  BATCH_ENGAGEMENT = "batchEngagement",
  GET_COMMENTS = "getComments",

  // FOLLOW KEYS
  GET_FOLLOWERS = "getFollowers",
  GET_FOLLOWING = "getFollowing",
  FOLLOW_STATUS = "followStatus",
  SUGGESTED_USERS = "suggestedUsers",
}