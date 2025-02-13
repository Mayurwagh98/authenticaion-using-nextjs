const UserProfile = ({ params }: any) => {
  return (
    <div>
      <h2>User's Profile details {params.id}</h2>
    </div>
  );
};

export default UserProfile;
