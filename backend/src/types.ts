export enum PLATFORM {
    CODECHEF = "Codechef",
    CODEFORCES = "Codeforces",
    LEETCODE = "Leetcode"
}

export interface CONTEST_INTERFACE {
    site: PLATFORM,
    title: String,
    startTime: Number,
    endTime: Number,
    duration: Number,
    url: String
}