import React, { FunctionComponent } from 'react'
import { useRoute, Link } from 'react-router5'
import { BreadcrumbsProps, RouterWithCrumbs } from './typings'
import { HomeIcon, ArrowIcon } from './assets'
import { useBreadcrumbs } from './hooks'

export const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({
  removeCrumb,
  forward,
  t = (text: string) => text,
  iconProps,
  children,
  got = {},
  homeRouteName = 'home',
  homeRouteLabel = 'Home',
  classes: {
    activeLink = 'flex items-baseline text-blue-700 hover:underline mx-2',
    currentPage = 'text-gray-500 ml-2',
    activeCrumb = 'list-none flex items-baseline',
    wrapper = 'flex items-baseline text-xl my-10 whitespace-no-wrap',
  } = {},
  icons: { CustomHomeIcon = <></>, CustomArrowIcon = <></> } = {},
}) => {
  const {
    route: { params, path },
  } = useRoute()
  const { filteredPaths, handleClick, dependencies } = useBreadcrumbs(
    removeCrumb,
    forward
  )
  const Arrow = () =>
    CustomArrowIcon.type.name ? CustomArrowIcon : <ArrowIcon {...iconProps} />

  const Home = () =>
    CustomHomeIcon.type.name ? CustomHomeIcon : <HomeIcon {...iconProps} />

  const Crumbs = () => {
    return (
      <>
        {filteredPaths?.map((crumb: RouterWithCrumbs, idx: number) => {
          const isNotEnd = filteredPaths.length > idx + 1

          if (!crumb.crumb) {
            crumb = {
              ...crumb,
              ...dependencies.find(
                (el: { name: string }) => el.name === crumb.route
              ),
            }
          }
          return (
            crumb.route !== '@@router5/UNKNOWN_ROUTE' && (
              <React.Fragment key={idx}>
                {isNotEnd ? (
                  t(`${crumb.crumb || crumb.name}`) && (
                    <li
                      itemScope
                      itemType='http://data-vocabulary.org/Breadcrumb'
                      className={activeCrumb}
                    >
                      <Link
                        className={activeLink}
                        routeName={crumb.route}
                        routeParams={{ ...params }}
                        routeOptions={{ reload: true }}
                        onClick={handleClick}
                        itemProp='url'
                      >
                        {got[idx] !== undefined
                          ? got[idx]
                          : t(`${crumb.crumb || crumb.name}`)}
                      </Link>
                      <Arrow />
                    </li>
                  )
                ) : (
                  <li
                    itemScope
                    itemType='http://data-vocabulary.org/Breadcrumb'
                    className={currentPage}
                  >
                    {typeof children === 'object'
                      ? children
                      : t(`${children || crumb.crumb || crumb.name}`)}
                  </li>
                )}
              </React.Fragment>
            )
          )
        })}
      </>
    )
  }

  return (
    path !== '/' && (
      <nav style={{ textTransform: 'capitalize' }}>
        <ol className={wrapper}>
          <li
            itemScope
            itemType='http://data-vocabulary.org/Breadcrumb'
            className={activeCrumb}
          >
            <Link
              className={activeLink}
              routeName={homeRouteName}
              itemProp='url'
            >
              <Home />
              {t(homeRouteLabel)}
            </Link>
          </li>
          <Arrow />
          <Crumbs />
        </ol>
      </nav>
    )
  )
}
