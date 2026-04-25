import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AdminLib "../lib/admin";
import AdminTypes "../types/admin";
import Common "../types/common";

mixin (
  admins : Map.Map<Text, AdminTypes.AdminRecord>,
  sessions : Map.Map<Common.AdminSessionToken, AdminTypes.AdminSession>,
) {
  // Login with email+password, returns session token
  public shared func adminLogin(email : Text, password : Text) : async ?AdminTypes.AdminSession {
    AdminLib.login(admins, sessions, email, password);
  };

  // Logout (invalidate session token)
  public shared func adminLogout(token : Common.AdminSessionToken) : async () {
    sessions.remove(token);
  };

  // Add a new admin account (requires valid session token)
  public shared func addAdmin(token : Common.AdminSessionToken, email : Text, password : Text) : async () {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) AdminLib.addAdmin(admins, email, password);
    };
  };

  // Remove an admin account (requires valid session token)
  public shared func removeAdmin(token : Common.AdminSessionToken, email : Text) : async () {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) AdminLib.removeAdmin(admins, email);
    };
  };

  // List all admin emails (requires valid session token)
  public query func listAdmins(token : Common.AdminSessionToken) : async [Text] {
    switch (AdminLib.validateSession(sessions, token)) {
      case null Runtime.trap("Unauthorized: Invalid admin session");
      case (?_) AdminLib.listAdmins(admins);
    };
  };

  // Validate session token (used by frontend to check if still logged in)
  public query func validateAdminSession(token : Common.AdminSessionToken) : async Bool {
    AdminLib.validateSession(sessions, token) != null;
  };
};
