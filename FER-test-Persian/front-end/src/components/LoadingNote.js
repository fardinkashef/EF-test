import "./LoadingNote.css";
function LoadingNote() {
  return (
    <div className="LoadingNote">
      <p>
        This demo web-site uses a free back-end server on render.com. This free
        server will spin down with inactivity, which can delay requests by 50
        seconds or more. Sorry for any kind of inconvenience and if possible,
        please use a proxy to prevent any kind of restrictions.
      </p>
    </div>
  );
}
export default LoadingNote;
