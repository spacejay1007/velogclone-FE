import React from "react";
import styled from "styled-components";

const Comment = (props) => {
  const { userName, comment } = props;
  return (
    <React.Fragment>
      <Wrap>
        <Profile>
          <User>{userName}</User>
        </Profile>
        <CommentArea>{comment}</CommentArea>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  margin: 30px 0;
`;
const Profile = styled.div`
  box-sizing: border-box;
`;
const User = styled.span`
  font-weight: bold;
`;
const CommentArea = styled.div`
  box-sizing: border-box;
  margin: 10px 0;
`;

export default Comment;
