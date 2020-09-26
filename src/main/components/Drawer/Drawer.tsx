import React, { FC } from "react"
import {
  Drawer as MaterialDrawer,
  Divider,
  ListSubheader,
  ListItem,
  ListItemText,
} from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import { SongList } from "./SongList"
import { useStores } from "main/hooks/useStores"
import styled from "styled-components"
import { TrackList } from "./TrackList/TrackList"
import { localized } from "../../../common/localize/localizedString"
import Logo from "../../images/logo-white.svg"

const BannerContainer = styled.div`
  background: var(--theme-color);
  padding: 1rem 16px 0.9rem 16px;
`

const Banner: FC = () => {
  return (
    <BannerContainer>
      <Logo viewBox="0 0 449 120" height="1.5rem" width={undefined} />
    </BannerContainer>
  )
}

export const Drawer: FC = () => {
  const { rootStore } = useStores()
  const { open, onClose } = useObserver(() => ({
    open: rootStore.rootViewStore.openDrawer,
    onClose: () => (rootStore.rootViewStore.openDrawer = false),
  }))
  return (
    <MaterialDrawer open={open} onClose={onClose}>
      <Banner />
      <SongList />
      <Divider />
      <TrackList />
      <Divider />
      <ListItem button onClick={() => (rootStore.router.path = "/tempo")}>
        <ListItemText primary={localized("tempo-track", "Tempo Track")} />
      </ListItem>
    </MaterialDrawer>
  )
}

export const ListHeader = styled(ListSubheader)`
  &.MuiListSubheader-root {
    background: var(--background-color);
  }
`
