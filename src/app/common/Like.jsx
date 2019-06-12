import React from "react";
import firebase from "../authentication/FirebaseConfig";
import { IconButton, Icon } from "@material-ui/core";

const handleLike = (trackID, isLiked) => {
  let uid = localStorage.getItem("uid");

  if (isLiked) {
    firebase
      .firestore()
      .collection("all-tracks")
      .doc(trackID)
      .update(`likedBy.${uid}`, firebase.firestore.FieldValue.delete());
  } else {
    firebase
      .firestore()
      .collection("all-tracks")
      .doc(trackID)
      .set({ likedBy: { [uid]: true } }, { merge: true });
  }
};

const Like = ({ trackID, likedBy }) => {
  return (
    <IconButton
      size="medium"
      color={
        likedBy
          ? likedBy[localStorage.getItem("uid")] == true
            ? "secondary"
            : "default"
          : "default"
      }
      onClick={() =>
        handleLike(
          trackID,
          likedBy ? likedBy[localStorage.getItem("uid")] : null
        )
      }
    >
      <Icon fontSize="small">favorite</Icon>
    </IconButton>
  );
};

export default Like;
