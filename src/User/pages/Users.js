import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";

export default function Users() {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [fetchedUsers, setFetchedUsers] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );
        setFetchedUsers(responseData.users);
      } catch (err) {}
    };

    fetchUser();
  }, [sendRequest]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && fetchedUsers && <UsersList items={fetchedUsers} />}
    </React.Fragment>
  );
}
