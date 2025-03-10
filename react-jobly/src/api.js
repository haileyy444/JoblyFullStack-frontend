import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.\
//TOKENs

static token = null; 

  static setToken(newToken) {
    console.log("Setting new token: ", newToken);
    if (!newToken || newToken.split(".").length !== 3) {
      console.error("Invlaid token format recieved " , newToken);
      return;
    }
    this.token = newToken.trim();
    // localStorage.setItem("token", newToken);
    // JoblyApi.token = newToken;
  }

  static getToken() {
    return this.token || localStorage;
  }

  static clearToken() {
    this.token = null;
    localStorage.removeItem("token");
    // JoblyApi.token.removeItem();
  }

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const token = JoblyApi.getToken() || localStorage.getItem('token');
    if (!token) {
      console.log("No token in api.js request frunction found")
    }

    console.log("Using token for request from api.js request", JoblyApi.token, localStorage.getItem('token'));
    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` }; //JoblyAPI.token
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */
// COMPANY
static async getCompany(handle) {
  try {
    let res = await this.request(`companies/${handle}`);
    if (!res || !res.company) {
      throw new Error("No company data found");
    }
    console.log("getCompnay api.js result ", res, res.company);
    return res.company;
  } catch (err) {
    console.error("Error fetching company:", err);
    throw err; // Re-throw error to be caught by the caller
  }
}

  /** Get all companies. */

  static async getAllCompanies() {
    let res = await this.request("companies");
    return res.companies;
  }
    /** Get all jobs. */
//JOBS
    static async getAllJobs() {
      let res = await this.request("jobs");
      return res.jobs;
    }
      /** Get jobs by companies handle. */

  static async getJobForCompany(handle) {
    let res = await this.request(`companies/${handle}/jobs`);
    return res.jobs;
  }
  /** Apply for a job. */

  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res;
  }
  
     /** Get user profile. */
//USER PROFILE
     static async getUserProfile(username) {
      console.log("Getting user profile")
      let res = await this.request(`users/${username}`);

      console.log("Recieved user profile from api.js", res, res.user)
      return res.user;
    }
     /** Update user profile. */

     static async updateUserProfile(userData) {
      const {username, ...updateData} = userData;
      const res = await this.request(`users/${username}`, updateData, "patch");
      return res.user;
    }

//AUTH
    static async login(credentials) {
      let res = await this.request("auth/token", credentials, "post");
      if(res && res.token) {
        console.log(" res and res.token recieved in api.js as ", res, res.token)
        this.setToken(res.token);
        // JoblyApi.token = res.token;
        return res;
      }
      else {
        console.log("Login fialed. No token recieved");
        throw new Error("Login Failed")
      }

     
    }
    static async register(userData) {
      console.log("api.js starting")
      let res = await this.request("auth/register", userData, "post")
      console.log("Stored token api.js ", res.token);
      localStorage.setItem("token", res.token);
      JoblyApi.setToken(res.token);
    
      return res;
    }
    static logout() {
      this.clearToken();
      console.log("Logging out")
    }



 
  
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";




export default JoblyApi;