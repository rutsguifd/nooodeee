const addHATEOASLinks = (user) => {
  const userId = user.id;
  return {
    ...user,
    _links: {
      self: { href: `/users/${userId}` },
      hobbies: { href: `/users/${userId}/hobbies` },
    },
  };
};

module.exports = addHATEOASLinks;
