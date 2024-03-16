import "../app/pages/profiles/[displayName]/style.css"
export default function FriendsBox() {
  return (
    <div className="friend-container">
      <div className="friend-box">
        <h6>Friend 1 Display Name</h6>
        <p>Tags: Tag1, Tag2</p>
      </div>
      <div className="friend-box">
        <h6>Friend 2 Display Name</h6>
        <p>Tags: Tag3, Tag4</p>
      </div>
      {/* Add more friend boxes as needed */}
    </div>
  );
}
