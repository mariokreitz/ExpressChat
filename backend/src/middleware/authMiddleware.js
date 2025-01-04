import jwt from "jsonwebtoken";

const authMiddleware = (socket, next) => {
  const token = socket.handshake.query.token;

  if (!token) {
    return next(new Error("Token erforderlich"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error("Token ungültig"));
    }
    socket.userId = decoded.id;
    next();
  });
};

export default authMiddleware;
