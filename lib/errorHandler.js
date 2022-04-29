
export default function errorHandler(err, req, res, next) {
  console.log(`🤖 Something Went Wrong!
  Error: ${err.name}
  `)
  console.log(err.stack)

  if (err.name === 'NotFound' || err.name === 'CastError') {
    return res.status(404).json({ message: 'Not Found' })
  }

  if (err.name === 'ValidationError') {
    const customErrors = {}

    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }

    return res.status(422).json(customErrors)
  }

  if (err.name === 'OhNoYouDidnt') {
    return res.status(422).json({ message: "Sorry to disappoint you dear user but one of the creators of BreadBored sadly cannot stand the sight of this bread and she will not have it in her project. I'm serious I can't look at it. Seriously. All other breads are welcome and loved to bits! Have a carb filled day <3 ." })
  }

  if (err.name === 'AlreadyExists') {
    return res.status(400).json({ message: 'This bread already exists in BreadBored, please try another 🍞 Baking is a labor of loaf!' })
  }

  //* User errors
  if (err.name === 'UsernameExists') {
    return res.status(400).json({ message: 'This username is taken, please try another. Here is a pun to make you feel better: You’re the apple of my rye.' })
  }
  if (err.name === 'EmailExists') {
    return res.status(400).json({ message: 'This email is taken, please try another. Don’t be so sour, dough...' })
  }
  if (err.name === 'PasswordsNotMatching') {
    return res.status(400).json({ message: 'Make sure your passwords are matching and next time you need a loaf, challah at me.' })
  }
  if (err.name === 'UserInfoMissing') {
    return res.status(422).json({ message: 'Looks like you missed a field...Don’t worry, you can crust me.' })
  }

  if (
    err.name === 'Unauthorized' ||
    err.name === 'JsonWebTokenError' ||
    err.name === 'TokenExpiredError'
  ) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  res.sendStatus(500)
  next(err)
}