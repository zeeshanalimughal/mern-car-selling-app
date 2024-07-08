import { AuthRegisterBody } from "../interfaces/auth.interface";
import { User } from "../models";

export default class UserService {
  /**
   *  Create a new user
   * @param user  The user object to be created
   * @returns  The created user object
   */
  static async createUser(userData: AuthRegisterBody) {
    const user = new User(userData);
    await user.save();
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }

  /**
   *  Get a user by email
   * @param email  The email of the user
   * @returns  The user object
   */
  static async getUserByEmail(email: string) {
    return await User.findOne(
      {
        email,
      },
      { password: 0 }
    );
  }
}
