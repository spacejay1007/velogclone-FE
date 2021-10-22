// import
import { createAction, handleAc, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

// action
const SET_POST = "SET_POST";
// const SET_MY_POST = "SET_MY_POST";
const ADD_POST = "ADD_POST";
// const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";

// action creators
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
// const setMyPost = createAction(SET_MY_POST, (my_post_list) => ({
//   my_post_list,
// }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (postingId) => ({ postingId }));

// initialState
const initialState = {
  list: [
    {
      commentCnt: 2,
      content: "내용임",
      dayBefore: "3분전",
      filePath: null,
      postingId: 2,
      title: "제목임",
      userName: "hyo",
    },
  ],
};

// middleware
const getPostMW = (postingId) => {
  return function (dispatch, getState, { history }) {
    console.log(postingId);
    apis
      .getPostAX()
      .then((res) => {
        const post_list = res.data.data;
        console.log(post_list);
        if (postingId) {
          const post = post_list.filter((p) => p.postingId === postingId[0]);
          console.log(post);
          dispatch(setPost(post));
        } else {
          dispatch(setPost(post_list));
        }
        console.log("게시물 불러오기 완료");
        // window.alert('게시물 불러오기 완료')
        // post_list.forEach((post) => {
        //   const path = `http://54.180.148.132/display/${post.filePath}`;
        //   post.filePath = path;
        // });
      })
      .catch((err) => {
        console.log(err);
        console.log('게시물 불러오기 실패')
        window.alert("게시물 불러오기 실패");
      });
  };
};

// const getMyPostMW = (userName) =>{
//     return function (dispatch, getState, {history}){
//         console.log(userName)

//         apis
//             .getMyPostAX(userName)
//             .then(res =>{
//                 // console.log(res)
//                 // const my_post_list = res.data.myPostList
//                 // dispatch(setMyPost(my_post_list))
//             })
//             .catch((err)=>{
//                 console.log(err);
//             })
//     }
// }

const addPostMW = (post) => {
  return function (dispatch, getState, { history }) {
    apis
      .createPostAX(post)
      .then((res) => {
        console.log(res.data.msg);
        dispatch(addPost(post));
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deletePostMW = (postingId) =>{
  return function(dispatch, getState, {history}){
    apis
      .delPostAX(postingId)
      .then((res)=>{
        console.log(res)
        window.alert('게시글 삭제 완료')
        dispatch(deletePost(postingId));
      })
      .catch((err) =>{
        console.log(err)
      })
  }
}

// reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
        console.log(draft.list);
      }),
    // [SET_MY_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.list = action.payload.my_post_list;
    //     console.log(draft.list);
    //   }),
    // [DETAIL_POST]: (state,action) =>
    //   produce(state, (draft) => {
    //   draft.detail = action.payload.detail;
    // }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.post);
        console.log(draft.list);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state,(draft)=>{
        draft.list = draft.list.filter(p=>p.postingId !== action.payload.postingId)
      })  
  },
  initialState
);

// export
const actionCreators = {
  setPost,
  addPost,
  //   updatePost,
  deletePost,
  getPostMW,
  // getMyPostMW,
  addPostMW,
  deletePostMW
};

export { actionCreators };
