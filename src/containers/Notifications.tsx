import React from "react";
import VerificationBadge from "../assets/icons/verified_badge.svg";
import Arrow225Deg from "../assets/icons/arrow-225deg.svg";

import Filter from "../assets/icons/filter.svg";
import CaretDown from "../assets/icons/caret-down.svg";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../state/notifications/actions";
import Pagination from "../components/Pagination";
import { AppState } from "../state/store";
import { changePage } from "../state/notifications";
import NotificationAlert from "../config/constants/models/notifications";
import Photo from "../components/Photo";
import { formatToTimeAgo } from "../utils/formatTime";

const NotificationContent = (props) => {
  const renderNotificationIcon = (type: string, read: string, notification: NotificationAlert) => {
    switch (type) {
      case "VERIFIED":
        return (
          <img
            src={VerificationBadge}
            alt=""
            width={44}
            height={44}
            className="w-9 h-9"
          />
        );
      case "RECEIPT":
        return (
          <div
            className={`rounded-full h-9 w-9 ${!read ? "bg-loozr-purple" : "bg-dark-700"
              } flex items-center flex-shrink-0 justify-center`}
          >
            <img src={Arrow225Deg} alt="" className="object-cover w-3 h-4" />
          </div>
        );
      case "COINS_BOUGHT":
        return (
          <div
            className={`rounded-full h-9 w-9 ${!read ? "bg-loozr-purple" : "bg-dark-700"
              } flex items-center flex-shrink-0 justify-center`}
          >
            <img src={Arrow225Deg} alt="" className="object-cover w-3 h-4" />
          </div>
        );
      case "FOLLOW":
        return (
          <Photo
            alt={notification.sender.accountDomain}
            className="h-10 w-10 flex flex-shrink-0 object-cover rounded-full md:mr-3"
            style={{ border: "6px solid #141922" }}
          />
        );
    }
  };

  return (
    <div
      onScroll={props.onScroll}
      ref={props.listInnerRef}
      style={{ height: "100vh", overflowY: "auto" }}
    >
      {props.dataList.map((notification: NotificationAlert, index) => (
        <div key={index} className="flex items-center mb-6">
          {!notification.readReceipt && (
            <div className="!w-3 !h-3 flex flex-shrink-0 bg-loozr-green rounded-full mr-4" />
          )}
          {renderNotificationIcon(
            notification.reason,
            notification.readReceipt,
            notification
          )}
          <div className="ml-6">
            <p className="mb-0.5 font-medium text-sm text-white">
              {notification.message}
            </p>
            <p className="text-xs font-normal text-[#536079]">
              {formatToTimeAgo(notification.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: AppState) => state.notifications.notifications
  );
  const pagination = useSelector(
    (state: AppState) => state.notifications.pagination
  );

  return (
    <div className="w-full px-4 mt-4">
      <div className="flex items-center cursor-pointer mb-8">
        <img src={Filter} alt="" className="w-[18px] h-[16px] mr-6" />
        <p className="text-sm md:text-base text-muted font-medium mr-3">
          Filter notifications
        </p>
        <img src={CaretDown} alt="" className="w-[11px] h-1.5" />
      </div>
      <Pagination
        reachMaxLimit={pagination.reachMaxLimit}
        dataList={notifications}
        onFetchData={() => dispatch(getNotifications(pagination.nextCursor))}
        currentCursor={pagination.currentCursor}
        nextCursor={pagination.nextCursor}
        onSetCurrentCursor={() => dispatch(changePage())}
      >
        <NotificationContent />
      </Pagination>
    </div>
  );
};

export default Notifications;
