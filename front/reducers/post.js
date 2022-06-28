export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '먹보',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://picsum.photos/id/233/200/300',
        },
        {
          src: 'https://picsum.photos/id/231/200/300',
        },
        {
          src: 'https://picsum.photos/id/229/200/300',
        }
      ],
      Comments: [
        {
          User: {
            nickname: '제리',
          },
          content: '사진이 느낌있네요 ㄷ ㄷ',
        },
        {
          User: {
            nickname: '베러댐',
          },
          content: '더럽게 못찍네 ㅋㅋㅋ',
        }
      ]
    }
  ],
  imagePaths: [],
  postAdded: false,
}

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
}

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: '먹보',
  },
  Images: [],
  Comments: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      }
    default:
      return state;
  }
}

export default reducer;