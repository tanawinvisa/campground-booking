import campgroundService from "@/services/campground";
import { Campground, Campgrounds } from "@/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export function useCampground(campgroundId: string) {
  const [campground, setCampground] = useState<Campground | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCampground = async () => {
      try {
        const { data } = await campgroundService.get(campgroundId);
        setCampground(data);
      } catch (e) {
        if (e instanceof AxiosError) {
          setError(e.response?.data.message || "Error fetching campground");
        }
      }
    };

    fetchCampground();
  }, [campgroundId]);

  return { campground, error };
}

export function useAllCampgrounds() {
  const [campgrounds, setCampgrounds] = useState<Campground[] | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCampground = async () => {
      try {
        const { data } = await campgroundService.getAll();
        setCampgrounds(data);
      } catch (e) {
        if (e instanceof AxiosError) {
          setError(e.response?.data.message || "Error fetching campgrounds");
        }
      }
    };

    fetchCampground();
  }, []);

  return { campgrounds, error };
}
