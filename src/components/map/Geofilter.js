/** @format */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// Redux stuff
import { useDispatch } from "react-redux";

import { openScream } from "../../redux/actions/screamActions";

//MAPSTUF
import MapGL, { Source, Layer, Marker } from "@urbica/react-map-gl";

import { isMobileCustom } from "../../util/customDeviceDetect";

//COOKIES
import TopicFilter from "../layout/TopicFilter";
import setColorByTopic from "../../data/setColorByTopic";
import NoLocationPopUp from "./NoLocationPopUp";
import MobileMapButtons from "./MobileMapButtons";

const OpenIdeaButton = styled.div`
  position: absolute;
  width: ${(props) => 7 + props.likeCount / 2 + "px"};
  height: ${(props) => 7 + props.likeCount / 2 + "px"};
  min-width: unset;

  margin-left: ${(props) => -((7 + props.likeCount) / 4) + "px"};
  margin-top: ${(props) => -(7 + props.likeCount) / 4 + "px"};
  border-radius: 100%;
  border: 1px white solid;
  background-color: ${(props) => setColorByTopic(props.Thema)};
  opacity: 1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 9px 38px, rgba(0, 0, 0, 0.15) 0px 5px 5px;
`;

const Geofilter = ({
  viewport,
  _onViewportChange,
  dataFinal,

  handleShowResults,
  handleMapBoundsReset,

  loadingProjects,
  geoData,
  handleTopicSelector,
  topicsSelected,
}) => {
  const dispatch = useDispatch();

  const fetchDataScream = (screamId) => {
    dispatch(openScream(screamId));
  };

  const data =
    !loadingProjects && geoData !== undefined && geoData !== ""
      ? {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [JSON.parse(geoData)],
          },
        }
      : null;

  let dataNoLocation = [];

  if (dataFinal !== undefined && dataFinal.length > 0) {
    dataFinal.forEach((element) => {
      if (element.lat === 50.93864020643174) {
        dataNoLocation.push(element);
      }
    });
  }

  let dataFinalMap = [];
  const dataFinalMapArray = dataFinal;

  if (dataFinalMapArray !== undefined && dataNoLocation.length > 1) {
    dataFinalMapArray.forEach((element) => {
      if (element.lat !== 50.93864020643174) {
        dataFinalMap.push(element);
      }
    });
  }
  if (dataFinalMapArray !== undefined && dataNoLocation.length < 2) {
    dataFinalMapArray.forEach((element) => {
      dataFinalMap.push(element);
    });
  }

  const number = dataFinal.length;

  return (
    isMobileCustom && (
      <div
        style={{
          position: "relative",
          zIndex: "9",
          width: "100vw",
          height: "calc(100vh  - 100px)",
        }}
      >
        <MapGL
          style={{
            width: "100%",
            height: "100%",
          }}
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          minZoom={9}
          {...viewport}
          zoom={viewport.zoom}
          onViewportChange={_onViewportChange}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: 2700,
          }}
        >
          <Source id="maine" type="geojson" data={data} />
          <Layer
            id="maine"
            type="fill"
            source="maine"
            paint={{
              "fill-color": "#fed957",
              "fill-opacity": 0.2,
            }}
          />

          {dataFinalMap.map((element) => (
            <Marker
              key={element.screamId}
              longitude={element.long}
              latitude={element.lat}
            >
              <OpenIdeaButton
                setColorByTopic={setColorByTopic}
                likeCount={element.likeCount}
                Thema={element.Thema}
                onClick={() => fetchDataScream(element.screamId)}
              >
                <button
                  onClick={() => fetchDataScream(element.screamId)}
                  className="buttonExpand ripple"
                />
              </OpenIdeaButton>
              <NoLocationPopUp dataNoLocation={dataNoLocation} />
            </Marker>
          ))}

          <TopicFilter
            handleTopicSelector={handleTopicSelector}
            topicsSelected={topicsSelected}
          ></TopicFilter>

          <MobileMapButtons
            number={number}
            handleShowResults={handleShowResults}
            handleMapBoundsReset={handleMapBoundsReset}
          />
        </MapGL>
      </div>
    )
  );
};

Geofilter.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  openScream: PropTypes.func.isRequired,
};

export default Geofilter;
