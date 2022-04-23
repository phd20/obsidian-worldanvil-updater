import { request } from "obsidian";
import { CreateArticleParams } from "types/article";

export const getArticle = (
	articleId: string,
	applicationKey: string,
	authToken: string
) => {
	const requestParams = {
		url: `https://www.worldanvil.com/api/aragorn/article/${articleId}`,
		method: "GET",
		contentType: "application/json",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "app://obsidian.md",
			"User-Agent": "PhD20 Obsidian Plugin",
			"x-application-key": applicationKey,
			"x-auth-token": authToken,
		},
	};
	request(requestParams).then((data) => {
		console.log(data);
	});
};

export async function createArticle(
	params: CreateArticleParams,
	applicationKey: string,
	authToken: string
) {
    const requestParams = {
		url: `https://www.worldanvil.com/api/aragorn/article`,
		method: "POST",
		contentType: "application/json",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "app://obsidian.md",
			"User-Agent": "PhD20 Obsidian Plugin",
			"x-application-key": applicationKey,
			"x-auth-token": authToken,
		},
        body: JSON.stringify(params),
	};
	const response = request(requestParams).then(
        data => {
			// console.log(data);
            return data;
        }
    ).catch(
        err => {
            console.log(err);
            return "Error";
        }
    )
    return response;
};