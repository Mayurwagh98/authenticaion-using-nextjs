const UserProfile = async ({ params }: any) => {
  const { id } = await params;
  return (
    <div>
      <h2>User's Profile details {id}</h2>
    </div>
  );
};

export default UserProfile;
