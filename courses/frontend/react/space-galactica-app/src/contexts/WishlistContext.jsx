import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [planetsWishlist, setPlanetsWishlist] = useState([]);

  const isPlanetInWishlist = useCallback(
    (planetName) =>
      planetsWishlist.some((planet) => planet.name === planetName),
    [planetsWishlist],
  );

  const addPlanetToWishlist = useCallback((name, thumbnail) => {
    setPlanetsWishlist((current) => {
      if (current.some((planet) => planet.name === name)) {
        return current;
      }
      return [...current, { name, thumbnail }];
    });
  }, []);

  const removePlanetFromWishlist = useCallback((name) => {
    setPlanetsWishlist((current) =>
      current.filter((planet) => planet.name !== name),
    );
  }, []);

  const wishlistCount = planetsWishlist.length;

  const value = useMemo(
    () => ({
      planetsWishlist,
      addPlanetToWishlist,
      removePlanetFromWishlist,
      isPlanetInWishlist,
      wishlistCount,
    }),
    [
      planetsWishlist,
      addPlanetToWishlist,
      removePlanetFromWishlist,
      isPlanetInWishlist,
      wishlistCount,
    ],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context == null) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
