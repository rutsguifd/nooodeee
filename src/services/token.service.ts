import jwt from "jsonwebtoken";

class TokenService {
  static generateToken(id: string, email: string, role: string): string {
    return jwt.sign({ id, email, role }, process.env.JWT_SECRET!, {
      expiresIn: "4h",
    });
  }

  static validateToken(
    token: string
  ): { id: string; email: string; role: string } | null {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        email: string;
        role: string;
      };
      return decodedToken;
    } catch (error) {
      console.error("Error validating token:", error);
      return null;
    }
  }

  static refreshToken(token: string): string | null {
    const decodedToken = TokenService.validateToken(token);
    if (!decodedToken) return null;
    return TokenService.generateToken(
      decodedToken.id,
      decodedToken.email,
      decodedToken.role
    );
  }
}

export default TokenService;
