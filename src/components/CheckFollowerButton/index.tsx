import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import User from '../../config/constants/models/user';
import { getIndividualProfile } from "../../state/user/userActions";
import { useFollowCallback, useUnFollowCallback } from '../../state/user/hooks/follows';
import { useCheckFollowerCallback } from '../../state/user/hooks/useAccount';

export default function Index(props: any) { 
    const dispatch = useDispatch();
    const [checkFollower, setCheckFollower] = useState("") 
    const { getCheckFollower } = useCheckFollowerCallback()
    const { handleFollow } = useFollowCallback();
    const { handleUnFollow } = useUnFollowCallback();

    const CheckFollowers =async () => { 
        if(props.otheruser?.id){ 
            const result: any = await getCheckFollower(props.otheruser?.id); 
            setCheckFollower(result) 
            console.log(result); 
        }
    } 

    React.useEffect(() => { 
        CheckFollowers()
    },) 

    const onFollow = async (user: User) => { 
        await handleFollow(user.id);
        dispatch(getIndividualProfile(props.otheruser.accountDomain));
    };
    
    const onUnFollow = async (user: User) => { 
        await handleUnFollow(user.id);
        dispatch(getIndividualProfile(props.otheruser.accountDomain));
    }; 

    return (
      <div className='mr-10'> 
            {props.otheruser?.id !== props.user?.id && props.otheruser?.id && (
                <>
                  {!checkFollower ? ( 
                    <button
                      onClick={() => onFollow(props.otheruser)}
                      className="py-[8px] px-[14px] text-[12px] text-dark-700 font-semibold bg-white rounded-full"
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      onClick={() => onUnFollow(props.otheruser)}
                      className="py-[8px] px-[14px] text-[12px] text-dark-700 font-semibold bg-white rounded-full"
                    >
                      UnFollow
                    </button>
                  )}
                </>
              )}
        </div>
    )
} 