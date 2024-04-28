import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import User from "../../config/constants/models/user";
import { AppState } from "../../state/store";
import {
  useFollowCallback,
} from "../../state/user/hooks/follows";
import { getSuggestedUsers } from "../../state/user/userActions";
import { removeSuggestedUser } from "../../state/user/userReducer";
import Photo from "../Photo";
import VerifiedBadge from "../../assets/icons/verified.svg"
import { Add } from "@mui/icons-material";

const SuggestedFollows = (props: any) => {
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.user.suggestedUsers.users);
  const { handleFollow } = useFollowCallback();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getSuggestedUsers(''));
  }, []);

  const onFollow = async (user: User) => {
    dispatch(removeSuggestedUser(user.id));
    await handleFollow(user.id);
  };

  const SuggestedUserTable = ({ user }: { user: any }) => (
    <div className=' w-full flex justify-between my-2 items-center ' >
      <div className="flex items-center gap-2">
        <div className=" relative " >
          <Photo
            alt=""
            userId={user.username ?? user.accountId}
            src={user?.photo}
            className="object-contain flex justify-center items-center w-10 h-10 rounded-full "
            style={{ border: "3px solid #141922" }}
          />

          {user?.isVerified && (
            <img
              src={VerifiedBadge}
              alt=""
              className="absolute w-4 h-4 right-0 bottom-0"
            />
          )}
        </div>
        <div onClick={() => navigate(`/${user.accountDomain}`)}>
          <div className=' flex -mt-1 items-center ' >
            <p className=' text-[13px] font-semibold ' > {user.username ?? user.accountId}</p>
          </div>
          <div className=' flex -mt-1 items-center ' >
            <p className=' text-[11px] font-semibold text-[#536079] ' >{user.accountType}</p>
          </div>
        </div>
      </div>
      <p onClick={() => onFollow(user)} className='text-white bg-[#536079] rounded-full px-2 py-1 cursor-pointer' ><Add fontSize="small" /></p>
    </div>
  )

  const renderUsers = (users: User[]) => {
    const shortenedUserList = users.slice(0, 3);
    return shortenedUserList.map((user: User, index) => (
      <SuggestedUserTable user={user} key={index} />
    ));
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3 w-full">
        <p className="text-xs font-semibold text-muted ">Suggested For You</p>
        <p onClick={() => props.modal(true)} className="text-xs cursor-pointer font-medium text-muted">View all</p>
      </div>
      {users
        ? renderUsers(users)
        : null}
    </>
  );
};

export default SuggestedFollows; 