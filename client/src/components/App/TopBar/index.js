import React from 'react'

const TopBar = () => {
  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar>
        <Typography variant='h6' noWrap className={classes.title}>
          Moody Drinks v2
        </Typography>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='end'
          onClick={handleDrawerOpen}
          className={clsx(open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
