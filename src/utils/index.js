const checkPermission = (listPermissions, listItem) => {
  if (typeof listItem === 'string') {
    return listItem === 'DISPENSA_PERMISSAO' || listPermissions.indexOf(listItem) >= 0;
  }

  const itens = Object.values(listItem);

  for (let i = 0; i < itens.length; i += 1) {
    const item = itens[i];
    if (item === 'DISPENSA_PERMISSAO' || listPermissions.indexOf(item) >= 0) {
      return true;
    }
  }
  return false;
};

export default checkPermission;
