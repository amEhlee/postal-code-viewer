import React, { useState } from "react";
import { Card, FormControl, TextField, Button } from "@mui/material";
import axios from "axios";

export default function PostalLookupPage() {
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [data, setData] = useState([]);

  function handlePostalLookup() {
    const postalLookupSource = `https://api.zippopotam.us/us/${postalCode}`;

    axios
      .get(postalLookupSource)
      .then((res) => {
        console.log(res);
        setCountry(res.data.country);
        setData(res.data.places);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex flex-col items-center mt-20 mx-8 text-center p-4">
      <Card className="flex flex-col gap-4 mx-4 p-4  ">
        <h1 className="mx-4">Postal Code Lookup</h1>
        <h3>Enter a Postal Code Below!</h3>

        <section>
          <p className="text-gray-400 mb-10">
            Try "73001" or "10004" for a few famous locations
          </p>
          <FormControl>
            <div className="flex justify-center gap-4">
              <TextField
                label="Postal Code"
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
              />

              <Button onClick={handlePostalLookup} variant="outlined">
                Search
              </Button>
            </div>
          </FormControl>
        </section>
      </Card>

      {data.length !== 0 ? (
        <Card className="flex flex-col gap-4 my-8 p-4 m-auto text-center rounded-lg">
          {data.map((i) => (
            <>
              <h1>{i["place name"]}</h1>
              <div>
                <b>{country}</b>
                <p>{i.state}</p>
              </div>

              <h3>Description</h3>
              <p className="max-w-[500px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis.
              </p>
              <p className="grid grid-flow-row grid-cols-2">
                <div>
                  <b>lat:</b> {i.latitude}
                </div>
                <div>
                  <b>long:</b> {i.longitude}
                </div>
              </p>
            </>
          ))}
        </Card>
      ) : null}
    </div>
  );
}
