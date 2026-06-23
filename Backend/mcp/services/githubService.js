import { Octokit } from "@octokit/rest"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

console.log(
  "GitHub Token Loaded:",
  !!process.env.GITHUB_TOKEN
)

// ======================================
// GET REPOSITORY INFO
// ======================================

export async function getRepoInfo(
  owner,
  repo
) {

  console.log(
    "Fetching Repo:",
    owner,
    repo
  )

  try {

    const { data } =
      await octokit.repos.get({

        owner,
        repo,

      })

    return {

      name:
        data.name,

      description:
        data.description,

      language:
        data.language,

      stars:
        data.stargazers_count,

      forks:
        data.forks_count,

      issues:
        data.open_issues_count,

      url:
        data.html_url,

    }

  } catch (error) {

    console.log(
      "GitHub Repo Error:",
      error.message
    )

    return null
  }
}

// ======================================
// GET USER REPOSITORIES
// ======================================

export async function getUserRepos(
  username
) {

  console.log(
    "Fetching User Repos:",
    username
  )

  try {

    const { data } =
      await octokit.repos.listForUser({

        username,

        sort: "updated",

        per_page: 10,

      })

    return data.map(
      (repo) => ({

        name:
          repo.name,

        description:
          repo.description,

        stars:
          repo.stargazers_count,

        language:
          repo.language,

        url:
          repo.html_url,

      })
    )

  } catch (error) {

    console.log(
      "GitHub User Repos Error:",
      error.message
    )

    return null
  }
}

// ======================================
// GET USER PROFILE
// ======================================

export async function getUserProfile(
  username
) {

  console.log(
    "Fetching User Profile:",
    username
  )

  try {

    const { data } =
      await octokit.users.getByUsername({

        username,

      })

    return {

      login:
        data.login,

      name:
        data.name,

      bio:
        data.bio,

      followers:
        data.followers,

      following:
        data.following,

      publicRepos:
        data.public_repos,

      profileUrl:
        data.html_url,

    }

  } catch (error) {

    console.log(
      "GitHub Profile Error:",
      error.message
    )

    return null
  }
}