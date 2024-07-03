"use client"
import NewLayout from '@/components/NewLayout'
import ParentCategoryPage from '@/components/ParentCategoryPage';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Page() {
    return(<ParentCategoryPage pcname="Accessories"/>);
}

export default Page
