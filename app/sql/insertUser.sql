INSERT INTO users(
	email,
	githubid,
	githubaccesstoken,
	githubusername,
	created_on
) VALUES (
	$1,
	$2,
	$3,
	$4,
	NOW()
) ON CONFLICT DO NOTHING